	{
		ruleset: ['OU'],
		banlist: ['Huge Power', 'Pure Power', 'Kyurem-Black', 'Slaking', 'Regigigas', 'Deep Sea Scale', 'Deep Sea Tooth', 'Eviolite', 'Light Ball', 'Thick Club'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let pal = target.side.team.find(set => this.getTemplate(set.species).color == template.color);
			return Object.assign({}, template, {baseStats: this.getTemplate(pal.species).baseStats});
		},
	},
