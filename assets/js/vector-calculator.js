
let fieldCount = 0;
const MAX_FIELDS = 5;

function createFieldHTML(id) {
    return `
        <div class="input-group" id="field-${id}">
            <div class="field-controls">
                <h3 class="field-title">Field ${id + 1}</h3>
                <button class="remove-field" onclick="removeField(${id})" 
                        aria-label="Remove field ${id + 1}">
                    Remove
                </button>
            </div>
            <div class="field-settings">
                <div class="field-row">
                    <div>
                        <label for="fieldName-${id}">Field Name:</label>
                        <input type="text" id="fieldName-${id}" 
                               placeholder="Field name" aria-label="Field name">
                    </div>
                    <div>
                        <label for="dimensions-${id}">Dimensions:</label>
                        <input type="number" id="dimensions-${id}" min="1" 
                               placeholder="Dimensions" aria-label="Vector dimensions">
                    </div>
                    <div>
                        <label for="compression-${id}">Compression Ratio:</label>
                        <select id="compression-${id}" aria-label="Select compression ratio">
                            <option value="1">None (1:1)</option>
                            <option value="0.5">2:1 (50%)</option>
                            <option value="0.25">4:1 (25%)</option>
                            <option value="0.125">8:1 (12.5%)</option>
                        </select>
                    </div>
                </div>
                <div class="field-row">
                    <div>
                        <label for="engine-${id}">Engine:</label>
                        <select id="engine-${id}" aria-label="Select engine type">
                            <option value="nmslib">NMSLIB</option>
                            <option value="faiss">FAISS</option>
                            <option value="lucene">Lucene</option>
                        </select>
                    </div>
                    <div>
                        <label for="dataType-${id}">Data Type:</label>
                        <select id="dataType-${id}" aria-label="Select data type">
                            <option value="float">Float (32-bit)</option>
                            <option value="byte">Byte (8-bit)</option>
                        </select>
                    </div>
                    <div>
                        <label for="method-${id}">Method:</label>
                        <select id="method-${id}" aria-label="Select method type">
                            <option value="hnsw">HNSW</option>
                            <option value="flat">Flat</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addField() {
    if (fieldCount >= MAX_FIELDS) {
        alert(`Maximum number of fields (${MAX_FIELDS}) reached.`);
        return;
    }

    const container = document.getElementById('fields-container');
    container.insertAdjacentHTML('beforeend', createFieldHTML(fieldCount));
    fieldCount++;

    updateAddFieldButton();
}

function removeField(id) {
    const field = document.getElementById(`field-${id}`);
    field.remove();
    fieldCount--;
    updateAddFieldButton();
}

function updateAddFieldButton() {
    const addButton = document.getElementById('addFieldButton');
    addButton.disabled = fieldCount >= MAX_FIELDS;
    addButton.style.opacity = fieldCount >= MAX_FIELDS ? '0.5' : '1';
}

function calculateMemory() {
    let totalMemory = 0;
    const result = document.getElementById('result');
    const totalDocs = parseInt(document.getElementById('totalDocuments').value);

    if (!totalDocs || totalDocs <= 0) {
        result.innerHTML = 'Error: Please enter a valid number of total documents.';
        result.classList.add('error-message');
        return;
    }

    result.classList.remove('error-message');
    let fieldDetails = [];

    for (let i = 0; i < MAX_FIELDS; i++) {
        const fieldElement = document.getElementById(`field-${i}`);
        if (!fieldElement) continue;

        const dimensions = parseInt(document.getElementById(`dimensions-${i}`).value) || 0;
        const engine = document.getElementById(`engine-${i}`).value;
        const dataType = document.getElementById(`dataType-${i}`).value;
        const method = document.getElementById(`method-${i}`).value;
        const compression = parseFloat(document.getElementById(`compression-${i}`).value);
        const fieldName = document.getElementById(`fieldName-${i}`).value || `Field ${i + 1}`;

        if (dimensions <= 0) {
            result.innerHTML = `Error: Please enter valid dimensions for ${fieldName}`;
            result.classList.add('error-message');
            return;
        }

        let bytesPerValue = dataType === 'float' ? 4 : 1;
        let fieldMemory = totalDocs * dimensions * bytesPerValue * compression;

        // Add overhead based on engine and method
        if (method === 'hnsw') {
            fieldMemory *= 1.1; // 10% overhead for HNSW graph
        }

        if (engine === 'faiss') {
            fieldMemory *= 1.2; // 20% overhead for FAISS index structures
        }

        totalMemory += fieldMemory;
        fieldDetails.push({
            name: fieldName,
            memory: fieldMemory
        });
    }

    // Format the output
    let output = '<h3>Memory Estimation Results:</h3>';
    output += `<p>Total Documents: ${totalDocs.toLocaleString()}</p>`;

    // Add individual field details
    output += '<h4>Per Field Breakdown:</h4>';
    fieldDetails.forEach(field => {
        output += `<p>${field.name}: ${formatMemorySize(field.memory)}</p>`;
    });

    // Add total
    output += `<h4>Total Estimated Memory: ${formatMemorySize(totalMemory)}</h4>`;

    result.innerHTML = output;
}

function formatMemorySize(bytes) {
    if (bytes < 1024) {
        return `${bytes.toFixed(2)} bytes`;
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
}

// Initialize with one field
addField();