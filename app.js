'use strict';

const barkModel =  Bark.Model({
	url: 'http://api.hackeryou.com/v1/students?key=$2a$10$L.elJFhFE7GcMw.UAac1FezxQTnmz4mneINhEG9EBZcxFPKdFIm2m'
});


const barkTemplate = Bark.Template`
	<h2>${'name'}</h2>
	<img src="${'photo'}" alt="" />`;

const barkController =  Bark.Controller({
	model: barkModel,
	init() {
		this.model.fetch()
			.then( () => {
			this.model.attrs.students.forEach((student) => {
				Bark.View({
					template: barkTemplate(student),
					className: 'student',
					elem: document.querySelector('#app')
				}).render();
			});
		});
	}
})