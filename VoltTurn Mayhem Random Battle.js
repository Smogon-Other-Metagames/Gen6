	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onModifyMovePriority: -1,
		onModifyMove: function (move) {
			switch (move.target) {
			case 'normal':
			case 'randomNormal':
			case 'allAdjacent':
			case 'allAdjacentFoes':
			case 'any':
			case 'scripted':
				move.selfSwitch = true;
			}
		},
