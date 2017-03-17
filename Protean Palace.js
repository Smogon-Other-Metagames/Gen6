	{
		ruleset: ['OU'],
		onPrepareHitPriority: -1,
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (!type) return;
			if (type === '???') return;
			if (source.getTypes().join() === type) return;
			if (!source.setType(type)) return;
			this.add('-start', source, 'typechange', type);
		},
	},
