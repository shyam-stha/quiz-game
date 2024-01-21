const tableContainer = document.querySelector(".table-container");
let data;

document.addEventListener("DOMContentLoaded", async function () {
    const userData = JSON.parse(localStorage.getItem("data"));
    data = userData;
    if (userData) {
        showHighScore(userData);
    } else {
        const headingElement = document.createElement("h2");
        headingElement.classList.add("heading-2");
        headingElement.textContent = "Opps! No data found.";
        tableContainer.appendChild(headingElement);
    }
});

const sort = (option) => {
    if (option) {
        const sorted = selectionSort(
            data,
            option.value,
            option.value == "score" ? "number" : "string"
        );
        showHighScore(sorted);
    }
};

const showHighScore = async (userData) => {
    tableContainer.innerHTML = `
            <table >
                <tr>
                    <th>
                        Timestamp
                    </th>
                     <th>
                        Username
                    </th>
                     <th>
                        Difficulty
                    </th>
                     <th>
                        Score
                    </th>
                </tr>
                ${userData
                    ?.map((value, index) => {
                        return `
                        <tr key=${index}>
                            <td>
                              ${new Date(value.timestamp).toDateString()}.
                            </td>
                            <td>
                                ${value.name}
                            </td>
                            <td>
                                ${value.difficulty}
                            </td>
                            <td>
                                ${value.score}
                            </td>
                        </tr>
                    `;
                    })
                    .join(" ")}
            </table>
        `;
};
