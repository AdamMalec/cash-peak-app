<script lang="ts">
	function portal(node: HTMLElement) {
		let target: HTMLElement | null;

		function update() {
			target = document.querySelector('body');
			target?.appendChild(node);
			node.hidden = false;
		}

		function destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}

		update();

		return { update, destroy };
	}
</script>

<div class="portal" hidden use:portal>
	<slot />
</div>
