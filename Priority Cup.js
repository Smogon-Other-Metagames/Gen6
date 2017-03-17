	{
		ruleset: ['OU'],
		banlist: ['Heracross-Mega', "King's Rock", 'Razor Fang'],
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move) {
				let basePower = move.basePower;
				if (move.basePowerCallback) basePower = move.basePowerCallback.call(this, pokemon, target, move);
				if (basePower && basePower <= 40) return 1;
			}
		},
	},
