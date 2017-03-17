	{
		ruleset: ['Uber'],
		banlist: [
			'Gengar-Mega', 'Heatran',
			'Magic Guard', 'Regenerator',
			'Heal Order', 'Milk Drink', 'Moonlight', 'Morning Sun', 'Recover', 'Rest', 'Roost', 'Slack Off', 'Soft-Boiled', 'Swallow', 'Synthesis', 'Wish',
		],
		onValidateSet: function (set) {
			let problems = [];
			for (let i = 0; i < set.moves.length; i++) {
				let move = this.getMove(set.moves[i]);
				if (move.category !== 'Status') problems.push(move.name + ' is banned because it is a ' + move.category + ' move.');
			}
			return problems;
		},
	},
