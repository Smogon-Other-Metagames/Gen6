	{
		ruleset: ['OU'],
		onTryHit: function (target, source, move) {
			if (target.getTypes().includes(move.type)) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
	},
