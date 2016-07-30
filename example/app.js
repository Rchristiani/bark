'use strict';

const barkModel =  Bark.Model({
	url: 'http://api.hackeryou.com/v1/students?key=$2a$10$L.elJFhFE7GcMw.UAac1FezxQTnmz4mneINhEG9EBZcxFPKdFIm2m'
});


const barkTemplate = Bark.Template`
	<h2>${student => student.name}</h2>
	<img src="${'photo'}" alt="" />
	<p>${'job.location'}</p>
	<p>${'job.position'}</p>`;

const barkController =  Bark.Controller({
	model: barkModel,
	init() {
		this.model.fetch()
			.then( () => {
			this.model.attrs.students.forEach((student) => {
				Bark.View({
					template: barkTemplate(student),
					className: 'student',
					elem: document.querySelector('#app'),
					events: {
						'click h2': 'myClickHandler'
					},
					myClickHandler: function() {
						console.log(this);
					}
				}).render();
			});
		});
	}
});

const headerTemplate = Bark.Template`
	<ul>
		<li>2015</li>
		<li>2016</li>
		<li>${$ => $[0]}</li>
	</ul>
`;

const headerController = Bark.Controller({
	init() {
		Bark.View({
			template: headerTemplate(['test']),
			elem: document.querySelector('.main-header'),
			elemType: 'nav'
		}).render();	
	}
});
