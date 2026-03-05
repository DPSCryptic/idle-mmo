import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

import type { StockInvestmentType } from '../../../types/InvestingTypes';

function InvestmentGraph({ stock }: { stock: StockInvestmentType }) {
	const lineData = stock.priceHistory.prices.map((price, index) => ({
		x: stock.priceHistory.dates[index],
		y: price,
	}));

	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<LineChart
				margin={{ bottom: 0, left: 10, right: 15, top: 0 }}
				showToolbar={false}
				dataset={lineData}
				series={[
					{
						data: stock.priceHistory.prices.map(p => Number(p.toFixed(2))),
						label: 'price',
						curve: 'linear',
						showMark: ({ index }) => index % 1 === 0,
					},
				]}
				xAxis={[
					{
						scaleType: 'point',
						data: stock.priceHistory.dates.map(d => new Date(d)),
						valueFormatter: date => date.toLocaleDateString([], { day: '2-digit', month: '2-digit' }),
						height: 25,
						tickSize: 5,
					},
				]}
				yAxis={[{ width: 55, tickSize: 5, scaleType: 'log' }]}
				slotProps={{ legend: { sx: { '& .MuiChartsLegend-label': { fontSize: 16, textShadow: 'none' } } } }}
			/>
		</Box>
	);
}
export default InvestmentGraph;
