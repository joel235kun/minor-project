const form = document.querySelector("#issueForm");
const table = document.querySelector("#issueTable");

const filterIssue = document.querySelector("#filterIssue");
const filterStatus = document.querySelector("#filterStatus");

const openCount = document.querySelector("#openCount");
const resolvedCount = document.querySelector("#resolvedCount");

function updateCounts() {

    let open = 0;
    let resolved = 0;

    document.querySelectorAll("#issueTable tr").forEach(row => {

        const status = row.dataset.status;

        if(status === "Open")
            open++;
        else
            resolved++;
    });

    openCount.textContent = open;
    resolvedCount.textContent = resolved;
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const deliveryId =
    document.querySelector("#deliveryId").value;

    const customerName =
    document.querySelector("#customerName").value;

    const issueType =
    document.querySelector("#issueType").value;

    const priority =
    document.querySelector(
        'input[name="priority"]:checked'
    ).value;

    const row = document.createElement("tr");

    row.dataset.issue = issueType;
    row.dataset.status = "Open";

    row.innerHTML = `
        <td>${deliveryId}</td>
        <td>${customerName}</td>
        <td>${issueType}</td>
        <td class="${priority==="High" ? "high" : ""}">
            ${priority}
        </td>
        <td class="status">Open</td>
        <td>
            <button class="resolve">
                Resolve
            </button>

            <button class="delete">
                Delete
            </button>
        </td>
    `;

    table.appendChild(row);

    form.reset();

    updateCounts();
});

table.addEventListener("click", function(e){

    const row = e.target.closest("tr");

    if(e.target.classList.contains("resolve")){

        row.querySelector(".status")
        .textContent = "Resolved";

        row.dataset.status = "Resolved";

        row.classList.add("resolved-row");

        e.target.disabled = true;

        updateCounts();
    }

    if(e.target.classList.contains("delete")){

        if(confirm("Delete this issue?")){

            row.remove();

            updateCounts();
        }
    }
});

function applyFilters(){

    const issueValue = filterIssue.value;
    const statusValue = filterStatus.value;

    document.querySelectorAll("#issueTable tr")
    .forEach(row=>{

        const issueMatch =
        issueValue === "All" ||
        row.dataset.issue === issueValue;

        const statusMatch =
        statusValue === "All" ||
        row.dataset.status === statusValue;

        row.style.display =
        issueMatch && statusMatch
        ? ""
        : "none";
    });
}

filterIssue.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);