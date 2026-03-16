document.getElementById("styleBtn").addEventListener("click", function () {
	const marginBox = document.getElementById("marginBox");
	const borderBox = document.getElementById("borderBox");
	const paddingBox = document.getElementById("paddingBox");
	const contentBox = document.getElementById("contentBox");

	marginBox.classList.toggle("box-margin-styled");
	borderBox.classList.toggle("box-border-styled");
	paddingBox.classList.toggle("box-padding-styled");
	contentBox.classList.toggle("box-content-styled");
});
