	{
		ruleset: ['OU'],
		banlist: ['Clefable', 'Kingdra', 'Venomoth', 'Huge Power', 'Pure Power'],
		onValidateSet: function (set) {
			let problems = [];
			let template = this.getTemplate(set.species);
			let item = this.getItem(set.item);
			if (item.megaEvolves === template.species) template = this.getTemplate(item.megaStone);
			let statTable = {hp:'an HP', atk:'an Attack', def:'a Defense', spa:'a Special Attack', spd:'a Special Defense', spe:'a Speed'};
			for (var stat in statTable) {
				if (template.baseStats[stat] >= 100) problems.push(template.species + " has " + statTable[stat] + " of " + template.baseStats[stat] + ", which is banned.");
			}
			return problems;
		},
	},
