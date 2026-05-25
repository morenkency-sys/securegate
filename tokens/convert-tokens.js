const fs = require('fs');
const path = require('path');

// Read JSON files
const colorTokensRaw = fs.readFileSync(path.join(__dirname, 'color-tokens.json'), 'utf8');
const designTokensRaw = fs.readFileSync(path.join(__dirname, 'design-tokens.tokens.json'), 'utf8');

const colorData = JSON.parse(colorTokensRaw);
const designData = JSON.parse(designTokensRaw);

// Utility to convert string to kebab-case
function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

// Utility to resolve token references like {color.palette.primary.100}
function resolveColor(ref, data) {
    if (typeof ref === 'string' && ref.startsWith('{') && ref.endsWith('}')) {
        const tokenPath = ref.slice(1, -1).split('.');
        let current = data;
        for (const p of tokenPath) {
            if (current && current[p] !== undefined) {
                current = current[p];
            } else {
                return ref;
            }
        }
        return current;
    }
    return ref;
}

let cssContent = `/* 
  Design Tokens
  Auto-generated CSS variables
*/\n\n`;

// 1. Process Light Theme Colors and Typography in :root
cssContent += ':root {\n';
cssContent += '  /* --- Colors (Light Theme) --- */\n';

if (colorData && colorData.color && colorData.color.role && colorData.color.role.light) {
    const lightRoles = colorData.color.role.light;
    for (const [key, value] of Object.entries(lightRoles)) {
        const resolvedValue = resolveColor(value, colorData);
        cssContent += `  --color-${toKebabCase(key)}: ${resolvedValue};\n`;
    }
}

cssContent += '\n  /* --- Typography --- */\n';
if (designData && designData.typography) {
    const typography = designData.typography;
    for (const [groupName, groupTokens] of Object.entries(typography)) {
        for (const [tokenName, properties] of Object.entries(groupTokens)) {
            for (const [propName, propData] of Object.entries(properties)) {
                let val = propData.value;
                
                // Append 'px' to numerical dimensions
                if (propData.type === 'dimension' && typeof val === 'number') {
                    val = `${val}px`;
                }
                
                // Construct variable name, e.g., --typography-display-large-font-size
                const cssVarName = `--typography-${toKebabCase(tokenName)}-${toKebabCase(propName)}`;
                cssContent += `  ${cssVarName}: ${val};\n`;
            }
        }
    }
}

cssContent += '}\n\n';

// 2. Process Dark Theme Colors in media query
if (colorData && colorData.color && colorData.color.role && colorData.color.role.dark) {
    cssContent += '@media (prefers-color-scheme: dark) {\n';
    cssContent += '  :root {\n';
    cssContent += '    /* --- Colors (Dark Theme) --- */\n';
    const darkRoles = colorData.color.role.dark;
    for (const [key, value] of Object.entries(darkRoles)) {
        const resolvedValue = resolveColor(value, colorData);
        cssContent += `    --color-${toKebabCase(key)}: ${resolvedValue};\n`;
    }
    cssContent += '  }\n';
    cssContent += '}\n';
}

// Write the output CSS file
const outputFilename = path.join(__dirname, 'variables.css');
fs.writeFileSync(outputFilename, cssContent, 'utf8');

console.log(`Successfully generated CSS variables in ${outputFilename}`);
