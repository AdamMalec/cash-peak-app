<script lang="ts">
	import BalloonAmount from '$lib/components/BalloonAmount.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import LineItemRow from './LineItemRow.svelte';
	import { centsToDollars, sumLineItems, addThousandsSeparator } from '$lib/utils/moneyHelpers';

	export let lineItems: LineItem[] | undefined = undefined;
	export let discount: number = 0;
	export let isEditable: boolean = true;

	let subtotal: string = '0.00';
	let discountAmount: string = '0.00';
	let total: string = '0.00';

	let dispatch = createEventDispatcher();

	$: if (sumLineItems(lineItems)) {
		subtotal = centsToDollars(sumLineItems(lineItems));
	}

	$: if (subtotal && discount) {
	 discountAmount = centsToDollars(sumLineItems(lineItems) * (discount / 100));
	}

	$: {
		const plainSubtotal = subtotal.replace(',', '');
		total = addThousandsSeparator((Number(plainSubtotal) - Number(discountAmount)).toFixed(2));
	}
</script>

<div class="table line">
	<span class="table-header">Description</span>
	<span class="table-header">Qty</span>
	<span class="table-header">Unit Price</span>
	<span class="table-header">Amount</span>
</div>

{#if lineItems}
	{#each lineItems as lineItem, index}
		<LineItemRow {lineItem}
			canDelete={index > 0}
			isRequired={index === 0}
			{isEditable}
			on:removeLineItem
			on:updateLineItem
		/>
	{/each}
{/if}

<div class="line">
	<div class="line-add">
		{#if isEditable}
			<Button label="+&nbsp;Line item" style="textOnly" onClick={() => {dispatch('addLineItem')}} />
		{/if}
	</div>
	<span class="line-subtitle">Subtotal</span>
	<span class="line-subtotal">${subtotal}</span>
</div>

<div class="line">
	<span class="line-discount-title">Discount </span>
	<div class="line-discount">
		<input
			type="number"
			name="discount"
			min="0"
			max="100"
			bind:value={discount}
			on:change={() => {dispatch('updateDiscount', {discount})}}
			disabled={!isEditable}
		/>
		<span>%</span>
	</div>
	<span class="line-discount-total">${discountAmount}</span>
</div>

<div class="line">
	<div class="line-total">
		<BalloonAmount amount={`$${total}`} />
	</div>
</div>

<style>
	.table {
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--pico-primary);
	}

	@media print {
		.table {
			display: none;
		}
	}

	.table-header {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--pico-primary);
	}

	@media (width < 576px)  {
		.table-header {
				display: none;
		}
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

	@media (width < 576px)  {
		.line-add {
			grid-column: span 1 / span 1;
		}
	}

	.line-subtitle {
		padding-block: 1rem;
		font-weight: bold;
		text-align: right;
		color: var(--pico-secondary-background);
	}

	@media (width < 576px)  {
		.line-subtitle {
			grid-column: 3 / span 1;
		}
	}

	.line-subtotal {
		padding-block: 1rem;
		font-family: monospace;
		font-size: 1rem;
		text-align: right;
	}
	@media (width < 576px)  {
		.line-subtotal {
			grid-column: 4 / span 1;
			padding-right: 0.5rem;
		}
	}

	.line-discount-title {
		grid-column: span 2 / span 2;
		padding-block: 1rem;
		font-weight: bold;
		text-align: right;
		color: var(--pico-secondary-background);
	}

	@media (width < 576px)  {
		.line-discount-title {
			grid-column: 1 / span 1;
		}
	}

	@media print  {
		.line-discount-title {
			grid-column: 1 / span 2;
		}
	}

	.line-discount {
		position: relative;
	}

	@media (width < 576px)  {
		.line-discount{
			grid-column: 2 / span 1;
		}
	}

	@media print  {
		.line-discount {
			grid-column: 3 / span 1;
		}
	}

	.line-discount span {
		position: absolute;
		top: 0.5rem;
		right: 0;
		font-family: monospace;
		font-size: 1rem;
	}

	.line-discount-total {
		padding-block: 0.7rem;
		text-align: right;
		font-family: monospace;
		font-size: 1rem;
	}

	@media (width < 576px)  {
		.line-discount-total {
			padding-right: 0.5rem;
		}
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

	@media (width < 576px)  {
		.line-total {
			grid-column: 4 / span 2;
		}
	}
</style>
