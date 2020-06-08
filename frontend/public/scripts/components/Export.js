import StateManager from '../utils/StateManager.js';

const Export = () => {
	return `
            <div class="export-container">
            	<div class="export-container__input">
					<label>Export as:</label>
					<select id="exportType">
						<option value="pdf">PDF</option>
						<option value="png">PNG</option>
						<option value="csv">CSV</option>
						<option value="svg">SVG</option>
					</select>
                </div>

				<div class="export-container__buttons">
					<a class="button button--primary" id="downloadBtn">Download</a>
					<a class="button button--primary">Send Email</a>
                </div>
            </div> 
        `;
};

const addEventsListeners = () => {
	const exportList = document.getElementById('exportType');
	const dwnButton = document.getElementById('downloadBtn');

	if (dwnButton) {
		dwnButton.addEventListener('click', (event) => {
			let toExport;
			let pie;
			const selectedValue = exportList.options[exportList.selectedIndex].value;
			if (selectedValue === 'csv') {
				//	alert('csv!');
				const { fetchedData } = StateManager.getStateForVisual();
				const csv = [];

				const columnNames = ['Label'];
				for (let i = 0; i < fetchedData.data.length; i++) {
					columnNames.push(fetchedData.data[i].name);
				}

				csv.push(columnNames);

				for (let i = 0; i < fetchedData.labels.length; i++) {
					let csvLine = [fetchedData.labels[i]];

					for (let j = 0; j < fetchedData.data.length; j++) {
						csvLine.push(fetchedData.data[j].data[i]);
					}

					csv.push(csvLine);
				}

				let csvContent =
					'data:text/csv;charset=utf-8,' +
					csv.map((e) => e.join(',')).join('\n');
				//	console.log(csv);
				console.log(csvContent);
				const elem = document.createElement('a');

				document.body.appendChild(elem);

				elem.href = encodeURI(csvContent);
				elem.download = 'date.csv';
				elem.click();

				document.body.removeChild(elem);
			} else if (selectedValue === 'pdf') {
				pie = false;
				let describeTxt = document.getElementsByClassName(
					'bar_graph__header__title',
				)[0];

				if (describeTxt) describeTxt = describeTxt.textContent;

				console.log(describeTxt);
				let toExport = document.querySelector('#chart');
				if (toExport == null) {
					toExport = document.querySelector('#pieChart');
					pie = true;
				}
				const canvasImage = toExport.toDataURL('image/png', 1.0);

				const exportedDoc = new jsPDF('landscape');
				exportedDoc.setFontSize(10);

				exportedDoc.text(15, 12, describeTxt ? describeTxt : '');

				if (pie) exportedDoc.addImage(canvasImage, 'PNG', 10, 10, 200, 150);
				else exportedDoc.addImage(canvasImage, 'PNG', 10, 10, 280, 150);

				exportedDoc.save('chart.pdf');
			} else if (selectedValue === 'png') {
				//alert('png!');

				toExport = document.querySelector('#chart');
				if (toExport == null) {
					toExport = document.querySelector('#pieChart');
					pie = true;
				}

				const elem = document.createElement('a');

				document.body.appendChild(elem);

				elem.href = toExport.toDataURL('image/png', 1.0);
				elem.download = 'chart.png';
				elem.click();

				document.body.removeChild(elem);
			}
		});
	}
};

export default Export;
export { addEventsListeners };
