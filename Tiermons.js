	{
		ruleset: ['OU'],
		unbanlist: ['Uber'],
		banlist: ['Groudon-Primal'],
		onValidateTeam: function (team) {
			let tiers = {'Uber': [], 'OU': [], 'UU': [], 'RU': [], 'NU': [], 'PU': []};
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				let species = template.species;
				let tier = template.tier;
				let item = this.getItem(team[i].item);
				if (item.megaEvolves === template.species) {
					species = item.megaStone;
					tier = this.getTemplate(species).tier;
				}
				let ability = this.getAbility(template.ability);
				if (ability.id === 'shadowtag') tier = 'Uber';
				if ((ability.id === 'drizzle' || ability.id === 'drought') && tier !== 'Uber') tier = 'OU';
				if (/^BL/.test(tier)) tier = {BL: 'OU', BL2: 'UU', BL3: 'RU', BL3: 'NU'}[tier];
				if (team[i].moves.includes('chatter')) tier = 'NU';
				if (!(tier in tiers)) tier = 'PU';
				tiers[tier].push(species);
			}
			let problems = [];
			for (let tier in tiers) {
				if (tiers[tier].length > 1) problems.push("You can only have one " + tier + " Pokemon. (" + tiers[tier].join(", ") + ")");
				if (!tiers[tier].length) problems.push("You have no " + tier + " Pokemon.");
			}
			return problems;
		},
	},
