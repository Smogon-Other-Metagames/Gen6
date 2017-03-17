	{
		ruleset: ['OU'],
		onValidateTeam: function (team) {
			let total = 0;
			team.forEach(set => {
				let item = this.getItem(set.item);
				let template = this.getTemplate(item.megaEvolves === set.species ? item.megaStone : set.species);
				Object.values(template.baseStats).forEach(stat => total += stat);
			});
			if (total > 2300) return ["You are limited to a BST of 2300 by Budgetmons.", "(Your team's BST is " + total + ".)"];
		}
	},
