	{
		ruleset: ['OU'],
		onTryHit: function (target, source, move) {
			if (target !== source && !target.ignoringItem()) {
				let item = target.getItem();
				if (item.naturalGift && item.naturalGift.type === move.type) {
					this.add('-immune', target, '[msg]');
					return null;
				}
			}
		},
	},
