	{
		ruleset: ['OU'],
		banlist: ['Keldeo', 'Metagross-Mega', 'Fire Spin', 'Infestation', 'Mud-Slap', 'Sand Tomb', 'Whirlpool'],
		onModifyMove: function (move, pokemon) {
			var excludedMoves = ['bodyslam', 'flyingpress', 'phantomforce', 'shadowforce', 'steamroller', 'stomp'];
			if (!move.priority) {
				if (typeof move.multihit === 'number') {
					move.basePower = 100 / move.multihit;
				} else if (move.multihit) {
					move.basePower = 100 / move.multihit[1];
				} else if (!move.basePowerCallback && !move.onBasePower && move.basePower && move.category !== 'Status' && !excludedMoves.includes(move.id)) {
					move.basePower = 100;
				}
			}
		},
	},
