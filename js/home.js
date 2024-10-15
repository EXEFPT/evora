function renderHome(data, sectionId, eventType) {
  const homeContainer = document.getElementById(sectionId);
  if (!homeContainer || !data.event || !data.event[eventType]) return;

  homeContainer.innerHTML = "";

  let rowHtml = "";
  const items = data.event[eventType].slice(0, 4);
  console.log(`Items for ${eventType}:`, items);

  items.forEach((item, index) => {
    const tagsHtml = item.listEvent
      .map((event) => `<span class="badge bg-primary me-1">${event}</span>`)
      .join("");

    const itemHtml = `
            <div class="col-lg-6 mb-4">
                <a href="event_detail.html?type=${eventType}&index=${index}" class="item-link">
                    <div class="d-flex h-100">
                        <div class="flex-shrink-0">
                            <img class="img-fluid" src="./${item.image}.jpg" alt="${item.name}" style="width: 200px; height: 200px;" loading="lazy">
                        </div>
                        <div class="d-flex flex-column justify-content-center text-start bg-secondary border-inner px-4">
                            <h5 class="text-uppercase">${item.name}</h5>
                            <span style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; text-overflow: ellipsis;">
                                ${item.about}
                            </span>
                            <strong class="mt-2">Chuyên:</strong>
                            <div>${tagsHtml}</div>
                        </div>
                    </div>
                </a>
            </div>
        `;

    if (index % 2 === 0) {
      rowHtml += '<div class="row">';
    }
    rowHtml += itemHtml;
    if (index % 2 === 1) {
      rowHtml += "</div>";
    }
  });

  if (items.length % 2 !== 0) {
    rowHtml += "</div>";
  }

  homeContainer.innerHTML = rowHtml;
}

// Fetch data and render initial content
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Render initial tab content
    renderHome(data, "sinh-nhat", "sinhnhat");
    renderHome(data, "tiec-cuoi", "tieccuoi");
    renderHome(data, "thoi-noi", "thoinoi");
    renderHome(data, "khai-truong", "khaitruong");

    // Listen for tab changes and re-render content
    document.querySelectorAll(".nav-link").forEach((tab) => {
      tab.addEventListener("shown.bs.tab", function (event) {
        const tabId = event.target.getAttribute("href"); // e.g., "#tab-1"
        const sectionMap = {
          "#tab-1": { id: "sinh-nhat", type: "sinhnhat" },
          "#tab-2": { id: "tiec-cuoi", type: "tieccuoi" },
          "#tab-3": { id: "thoi-noi", type: "thoinoi" },
          "#tab-4": { id: "khai-truong", type: "khaitruong" },
        };

        const { id, type } = sectionMap[tabId];
        renderHome(data, id, type);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Add CSS for hover effect
const style = document.createElement("style");
style.innerHTML = `
    .item-link {
        display: block;
        transition: transform 0.3s ease;
    }
    .item-link:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
