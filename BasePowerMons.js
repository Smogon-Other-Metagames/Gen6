	{
		ruleset: ['OU'],
		onModifyMovePriority: 2,
		onModifyMove: function (move, pokemon) {
			if (move.basePower > 0 && !move.multihit && move.priority <= 0) {
				move.basePower = move.name.length * 8;
			}
		},
	},
