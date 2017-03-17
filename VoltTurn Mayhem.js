	{
		ruleset: ['OU'],
		banlist: ['Fake Out > 1'],
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
	},
