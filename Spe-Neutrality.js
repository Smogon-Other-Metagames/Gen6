	{
		ruleset: ['OU'],
		onModifyPriorityPriority: -2,
		onModifyPriority: function (priority, pokemon, target, move) {
			return priority - Math.round(priority);
		},
	},
