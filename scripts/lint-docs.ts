import * as fs from 'fs';

const spec = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));
let errorCount = 0;

console.log("--- 🔎 Documentation Quality Audit ---");

const paths = spec.paths;

for (const path in paths) {
    for (const method in paths[path]) {
        const op = paths[path][method];
        
        // Rule 1: Summary must exist
        if (!op.summary) {
            console.error(`❌ MISSING SUMMARY: ${method.toUpperCase()} ${path}`);
            errorCount++;
        }

        // Rule 2: Description must be a full sentence (end with a period)
        if (op.description && !op.description.endsWith('.')) {
            console.error(`⚠️  STYLE ERROR: Description for ${path} should end with a period.`);
            errorCount++;
        }

        // Rule 3: Every definition must be substantial
        // Logic: Check the 'description' field
        const MIN_DEFINITION_LENGTH = 10;
        const description = op.description || "";
        const wordCount = description.split(' ').length;

        if (wordCount < MIN_DEFINITION_LENGTH) {
            console.error(`⚠️  STYLE ERROR: ${method.toUpperCase()} ${path}`);
            console.error(`   Description is too short (${wordCount} words). Please expand.`);
            errorCount++;
        }
    }
}

if (errorCount > 0) {
    console.log(`\nFound ${errorCount} documentation issues. Fix them to pass the build.`);
    process.exit(1); 
} else {
    console.log("\n✅ All documentation standards met!");
    process.exit(0);
}