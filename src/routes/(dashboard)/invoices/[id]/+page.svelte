<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { convertDate } from '$lib/utils/dateHelpers';
	import LineItemRows from '../LineItemRows.svelte';
	import { settings, loadSettings } from '$lib/stores/SettingsStore';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: Invoice;

	let invoice = data;

	function printInvoice() {
		window.print();
	}
	function copyLink() {
		navigator.clipboard.writeText($page.url.href);
		toast.success('Link copied!', {
			style: 'font-size: 0.8rem',
			iconTheme: {
				primary: '#22c697',
				secondary: '#f8f8f8'
			}
		});
	}
	function sendInvoice() {
		console.log('Send Invoice ...');
	}
	function payInvoice() {
		console.log('Pay Invoice ...');
	}

	onMount(() => {
		loadSettings();
	});
</script>

<div class="invoice">
	<div class="invoice__header">
		<h1 class="invoice__title">Invoice</h1>
		<ul class="invoice__actions">
			<li><Button label="Print" height="short" style="outline" onClick={printInvoice} /></li>
			<li><Button label="Copy Link" height="short" isAnimated={true} onClick={copyLink} /></li>
			<li><Button label="Send" height="short" isAnimated={true} onClick={sendInvoice} /></li>
			<li><Button label="Pay Invoice" height="short" isAnimated={true} onClick={payInvoice} /></li>
		</ul>
	</div>

	<div class="invoice__body">
		<div class="invoice__image">
			<img
				src="/images/logo-compressed-fm.png"
				srcset="/images/logo-compressed-fm@2x.png 2x, /images/logo-compressed-fm.png 1x"
				alt="Compressed.fm"
			/>
		</div>

		<div class="invoice__holder">
			{#if $settings && $settings.name}
				<span class="invoice__label">From</span>
				<p>
					{$settings.name}<br />
					{#if $settings.street && $settings.city && $settings.state && $settings.zip}
						{$settings.street}<br />
						{$settings.city}, {$settings.state}
						{$settings.zip}
					{/if}
				</p>
			{:else}
				<div class="invoice__holder-add">
					<a href="#">Add your contact information</a>
				</div>
			{/if}
		</div>

		<div class="invoice__client">
			<span class="invoice__label">Client</span>
			<p>
				<strong>{invoice.client.name}</strong><br />
				{invoice.client.email}<br />
				{invoice.client.street}<br />
				{invoice.client.city}, {invoice.client.state}
				{invoice.client.zip}
			</p>
		</div>

		<div class="invoice__id">
			<span class="invoice__label">Invoice ID</span>
			<p>{invoice.invoiceNumber}</p>
		</div>

		<div class="invoice__due-data">
			<span class="invoice__label">Due Date</span>
			<p>{convertDate(invoice.dueDate)}</p>
		</div>

		<div class="invoice__issue-data">
			<span class="invoice__label">Issue Date</span>
			<p>{convertDate(invoice.issueDate)}</p>
		</div>

		<div class="invoice__subject">
			<span class="invoice__label">Subject</span>
			<p>{invoice.subject}</p>
		</div>

		<div class="invoice__items">
			<LineItemRows
				lineItems={invoice.lineItems}
				isEditable={false}
				discount={invoice?.discount || 0}
			/>
		</div>

		{#if invoice.notes}
			<div class="invoice__notes">
				<span class="invoice__label">Notes</span>
				<SvelteMarkdown source={invoice.notes}></SvelteMarkdown>
			</div>
		{/if}

		{#if invoice.terms}
			<div class="invoice__terms">
				<span class="invoice__label">Terms and Conditions</span>
				<SvelteMarkdown source={invoice.terms}></SvelteMarkdown>
			</div>
		{/if}
	</div>
</div>

<style>
	.invoice__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1.2rem 0.8rem;
	}

	@media (width < 1280px)  {
		.invoice__header {
			padding-left: 4rem;
		}
	}

	@media (width < 768px)  {
		.invoice__header {
			flex-direction: column;
			align-items: flex-start;
			padding-left: 0rem;
			padding-top: 4rem;
		}
	}

	@media print  {
		.invoice__header {
			display: none;
		}
	}

	.invoice__title {
		color: var(--pico-primary);
	}

	.invoice__actions {
		display: flex;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (width < 768px)  {
		.invoice__actions {
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}

	.invoice__actions li {
		list-style: none;
	}

	@media (width < 768px)  {
		.invoice__actions li {
			margin-bottom: 0 !important;
		}
	}

	.invoice__body {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		row-gap: 1rem;
		padding: 4rem 6rem;
		line-height: 125%;
		background-color: var(--pico-primary-inverse);
		border-radius: 4px;
		box-shadow: -2px 0px 26px 0px rgba(0, 0, 0, 0.25);
	}

	@media (width < 768px)  {
		.invoice__body {
			padding: 2rem 1rem;
		}
	}

	@media print  {
		.invoice__body {
			box-shadow: none
		}
	}

	.invoice__label {
		font-weight: 700;
		color: #888888;
	}

	.invoice__label + p {
		font-family: var(--pico-font-family-monospace);
	}

	.invoice__image {
		grid-column: span 3;
	}

	@media (width < 576px)  {
		.invoice__image {
			grid-column: span 6;
		}
	}

	@media (width < 576px)  {
		.invoice__image {
			grid-column: span 3;
		}
	}

	.invoice__holder {
		grid-column: 5 / span 2;
		padding-top: 1rem;
	}

	@media (width < 576px)  {
		.invoice__holder {
			grid-column: 1 / span 6;
		}
	}

	@media print  {
		.invoice__holder {
			grid-column: 5 / span 2;
		}
	}

	.invoice__holder-add {
		display: flex;
		align-items: center;
		justify-content: center;

		min-height: 64px;
		background-color: #dadada;
		border-radius: 6px;
	}

	.invoice__holder-add a {
		font-size: 0.8rem;
		color: var(--color-black);
		/* text-decoration-line: underline; */
	}

	.invoice__holder-add a:hover {
		text-decoration: none;
	}

	.invoice__client {
		grid-column: span 3;
	}

	@media (width < 576px)  {
		.invoice__client {
			grid-column: span 6;
		}
	}

	.invoice__id {
		grid-column: 5 / span 2;
	}

	@media (width < 576px)  {
		.invoice__id {
			grid-column: 1 / span 6;
		}
	}

	.invoice__due-data {
		grid-column: span 3;
	}

	@media (width < 576px)  {
		.invoice__due-data {
			grid-column: span 3;
		}
	}

	.invoice__issue-data {
		grid-column: 5 / span 2;
	}

	@media (width < 576px)  {
		.invoice__issue-data {
			grid-column: 4 / span 3;
		}
	}

	.invoice__subject {
		grid-column: span 6;
	}

	.invoice__items {
		grid-column: span 6;
	}

	.invoice__notes {
		grid-column: span 6;
	}

	.invoice__terms {
		grid-column: span 6;
	}
</style>
