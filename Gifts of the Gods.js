	{
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Blissey', 'Chansey', 'Sableye-Mega',/* 'Talonflame','Eviolite', */'Soul Dew', 'Uber > 1', 'AG + Uber > 1'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let uber = target.side.team.find(set => {
				let item = this.getItem(set.item);
				return toId(set.ability) === 'shadowtag' || this.getTemplate(item.megaEvolves == set.species ? item.megaStone : set.species).tier === 'Uber';
			}) || target.side.team[0];
			let stat = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'][target.side.team.indexOf(target.set)];
			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			template.baseStats[stat] = this.getTemplate(uber.species).baseStats[stat];
			return template;
		},
	},
