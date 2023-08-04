<script lang="ts">
	import BalloonAmount from '$lib/components/BalloonAmount.svelte';
	import Button from '$lib/components/Button.svelte';
	import LineItemRow from './LineItemRow.svelte';

	export let lineItems: lineItems[] | undefined = undefined;
</script>

<div class="table">
	<span class="table-header">Description</span>
	<span class="table-header">Qty</span>
	<span class="table-header">Unit Price</span>
	<span class="table-header">Amount</span>
</div>

{#if lineItems}
	{#each lineItems as lineItem}
		<LineItemRow />
	{/each}
{/if}

<div class="line">
	<div class="line-add">
		<Button label="+&nbsp;Line" style="textOnly" onClick={() => {}} />
	</div>
	<span class="line-subtitle">Subtotal</span>
	<span class="line-subtotal">$250.00</span>
</div>

<div class="line">
	<span class="line-discount-title">Discount </span>
	<div class="line-discount">
		<input type="number" name="discount" min="0" max="100" />
		<span>%</span>
	</div>
	<span class="line-discount-total">$10.00</span>
</div>

<div class="line">
	<div class="line-total">
		<BalloonAmount amount="$1.440.00" />
	</div>
</div>

<style>
	.table {
		display: grid;
		grid-template-columns: 1fr 80px 120px 120px 65px;
		column-gap: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--pico-primary);
	}

	.table-header {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--pico-primary);
	}

	.table-header:nth-child(2) {
		text-align: center;
	}

	.table-header:nth-child(3) {
		text-align: right;
	}

	.table-header:nth-child(4) {
		text-align: right;
	}

	.line-add {
		grid-column: span 2 / span 2;
	}

	.line-subtitle {
		padding-block: 1rem;
		font-weight: bold;
		text-align: right;
		color: var(--pico-secondary-background);
	}

	.line-subtotal {
		padding-block: 1rem;
		font-family: monospace;
		font-size: 1rem;
		text-align: right;
	}

	.line-discount-title {
		grid-column: span 2 / span 2;
		padding-block: 1rem;
		font-weight: bold;
		text-align: right;
		color: var(--pico-secondary-background);
	}

	.line-discount {
		position: relative;
	}

	.line-discount span {
		position: absolute;
		top: 0.5rem;
		right: 0;
		font-family: monospace;
		font-size: 1rem;
	}

	.line-discount-total {
		padding-block: 1rem;
		text-align: right;
		font-family: monospace;
		font-size: 1rem;
	}

	input[name='discount'] {
		height: 2.2rem;
		padding: 0.4rem 0.8rem 0.2rem 0.4rem;
		text-align: right;
		background-color: var(--pico-primary-inverse);
		border: none;
		border-bottom: 2px dashed var(--pico-primary-dim);
		border-radius: 0;
	}

	input[name='discount']:focus {
		box-shadow: none;
		border-bottom: 4px solid var(--pico-primary-focus);
	}

	.line-total {
		grid-column: span 6 / span 6;
	}
</style>