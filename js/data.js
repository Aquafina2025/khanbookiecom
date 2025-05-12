const serverURL = "https://princebookie-server.vercel.app/api";
// const serverURL = "http://localhost:5000/api";

// Fetch data without caching
async function fetchData(endpoint) {
	const response = await fetch(`${serverURL}/${endpoint}`);

	// Check if the response is successful
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

// News section
async function fetchNews() {
	const news = document.getElementById("news");
	const data = await fetchData("news/6723d7a02881858f48e5a43c");
	news.innerHTML = `<marquee direction="left">${data.news}</marquee>`;
}

// Super and Admin WP Number section
async function wpNumber() {
	const wp_numbers = document.getElementById("first_wp");
	const second_wp = document.getElementById("second_wp");
	const third_wp = document.getElementById("third_wp");

	const data = await fetchData("superOrAdminNumber");
	let wpHTML = "";
	data.data.forEach((item) => {
		const linkHTML = `<a class="a_wa" target="_blank" href="https://wa.me/${item.whatsapp_number}">${item.whatsapp_number}</a>`;
		wpHTML += linkHTML;
	});
	wp_numbers.innerHTML = wpHTML;
	second_wp.innerHTML = wpHTML;
	third_wp.innerHTML += `<a class="a_wa" target="_blank" href="https://wa.me/${data.data[0].whatsapp_number}">Whatsapp us on - ${data.data[0].whatsapp_number}</a>`;
}

// User WP Number section
async function userWp() {
	const wp_numbers = document.getElementById("user_wp");
	const data = await fetchData("userAccount");
	wp_numbers.innerHTML = data.data
		.map(
			(item) =>
				`<a class="a_wa" target="_blank" href="https://wa.me/${item.whatsapp_number}">${item.whatsapp_number}</a>`,
		)
		.join("");
}

// Partners section
async function partners() {
	const partner = document.getElementById("partner");
	const data = await fetchData("demoid");
	partner.innerHTML = data.data
		.map(
			(item) => `
            <div class="lb_partner_wrap_inn">
                <div class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <h4>${item.title}</h4>
                            <img src="${item.imageURL}" alt="Add Logo" />
                            <a class="a_parnter a_gdid" onclick='handleFlipBox()'>Get Demo ID</a>
                        </div>
                        <div class="flip-box-back">
                            <h4>Demo ID</h4>
                            <ul>
                                <li>Username - <span>${item.username}</span></li>
                                <li>Pass - <span>${item.pass}</span></li>
                            </ul>
                            <a class="a_parnter" target="_blank" href="${item.websiteURL}">Visit Website</a>
                        </div>
                    </div>
                </div>
            </div>`,
		)
		.join("");
}

// Agent List section
async function agentList() {
	const agentList = document.getElementById("agent_list");
	const data = await fetchData("agent");
	agentList.innerHTML = data.data
		.map(
			(item) =>
				`<a class="a_wa" target="_blank" href="${item.link}">${item.title}</a>`,
		)
		.join("");
}

// Group List section
async function groupList() {
	const groupList = document.getElementById("group_list");
	const data = await fetchData("group");
	groupList.innerHTML = data.data
		.map(
			(item) =>
				`<a class="a_wa" target="_blank" href="${item.link}">${item.title}</a>`,
		)
		.join("");
}

// Flip box handler
const handleFlipBox = () => {
	const flipBox = document.querySelectorAll(".flip-box");
	flipBox.forEach((box) => {
		box.addEventListener("click", () => {
			flipBox.forEach((box2) => {
				if (box2.classList.contains("active")) box2.classList.remove("active");
			});
			box.classList.add("active");
		});
	});
};

// Run all functions on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
	fetchNews();
	wpNumber();
	userWp();
	partners();
	agentList();
	groupList();
});
