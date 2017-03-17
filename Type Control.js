	{
		ruleset: ['OU'],
		banlist: ['Kyurem-Black', 'Porygon-Z'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let types = [...new Set(target.name.split('/'))];
			if (!types.every(type => this.data.TypeChart[type])) return;
			return Object.assign({}, template, {types: types});
		},
	},
