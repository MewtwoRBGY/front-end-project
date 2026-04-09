/*// This function builds the "Bundles" (Name + Stats)
function makeCard() {
    const tbody = document.getElementByClass('recipe-card');
    if (!tbody) return;

    
    let html = "";
    sortedItems.forEach(item => {
        const modalId = "modal-syns-" + item.name.replace(/\s+/g, '-');

        // inject a modal for this item
        document.body.insertAdjacentHTML("beforeend", `
            <div class="modal fade" id="${modalId}" role="dialog">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">${item.name}</h4>
                        </div>
                        <div class="modal-body">
                            <p class="text-black">${item.desc}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `);

        html += `
            <tr class="table-info">
                <th colspan="2" class="text-center">
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#${modalId}">
                        ${item.name}
                    </button>
                </th>
            </tr>
            <tr><td>Rarity Tier</td><td class="${item.rarity}">${item.rarity}</td></tr>
            <tr><td>Source Type</td><td>${item.source}</td></tr>
            <tr><td>Drop %</td><td>${item.droprate}%</td></tr>
            <tr><td>Item Type</td><td>${item.type}</td></tr>
        `;
    });
    tbody.innerHTML = html;
}*/