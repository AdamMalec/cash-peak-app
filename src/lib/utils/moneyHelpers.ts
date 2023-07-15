export function sumLineItems(lineItems: lineItems[] | undefined) {
	if (!lineItems) return 0;
	return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
}

export function centsToDollars(cents: number): string {
	const dollars = cents / 100;
	const dollarsWithDecimals = dollars.toFixed(2);
	return addThousandsSeparator(dollarsWithDecimals);
}

export function addThousandsSeparator(myNum: string): string {
	return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function sumInvoices(invoices: Invoice[] | undefined): number {
	if (!invoices) return 0;
	return invoices.reduce((pervValue, curValue) => {
		const invoiceSum = sumLineItems(curValue.lineItems);
		return pervValue + invoiceSum;
	}, 0)
}
