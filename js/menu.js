function renderMenu(data, sectionId, eventType) {
  const container = document.getElementById(sectionId);
  if (!container || !data.event || !data.event[eventType]) return;

  container.innerHTML = "";

  let rowHtml = "";
  const items = data.event[eventType];

  items.forEach((item, index) => {
    const tagsHtml = item.listEvent
      .map((event) => `<span class="badge bg-primary me-1">${event}</span>`)
      .join("");

    const menuItem = `
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
    rowHtml += menuItem;
    if (index % 2 === 1) {
      rowHtml += "</div>";
    }
  });

  if (items.length % 2 !== 0) {
    rowHtml += "</div>";
  }

  container.innerHTML = rowHtml;
}

// Fetch data and render initial content
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    renderMenu(data, "menu-sinh-nhat", "sinhnhat");
    renderMenu(data, "menu-tiec-cuoi", "tieccuoi");
    renderMenu(data, "menu-thoi-noi", "thoinoi");
    renderMenu(data, "menu-khai-truong", "khaitruong");
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