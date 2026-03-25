window.salesChart = {
    render: function (canvasId, points) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || !Array.isArray(points) || points.length === 0) {
            return;
        }

        const ratio = window.devicePixelRatio || 1;
        const cssWidth = canvas.clientWidth || 720;
        const cssHeight = canvas.clientHeight || 360;

        canvas.width = cssWidth * ratio;
        canvas.height = cssHeight * ratio;

        const ctx = canvas.getContext("2d");
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        const padding = { top: 24, right: 18, bottom: 54, left: 52 };
        const chartWidth = cssWidth - padding.left - padding.right;
        const chartHeight = cssHeight - padding.top - padding.bottom;
        const maxValue = Math.max(...points.map(point => point.amount), 1);
        const stepValue = Math.max(1, Math.ceil(maxValue / 4));

        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, cssWidth, cssHeight);

        ctx.strokeStyle = "#d9e2ec";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + chartHeight);
        ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
        ctx.stroke();

        ctx.font = "12px Helvetica Neue, Arial, sans-serif";
        ctx.fillStyle = "#6c757d";

        for (let index = 0; index <= 4; index += 1) {
            const value = stepValue * index;
            const y = padding.top + chartHeight - (chartHeight * value / (stepValue * 4 || 1));

            ctx.strokeStyle = "#edf2f7";
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + chartWidth, y);
            ctx.stroke();

            ctx.fillStyle = "#6c757d";
            ctx.fillText(String(value), 10, y + 4);
        }

        const barGap = 16;
        const barWidth = Math.max(24, (chartWidth - barGap * (points.length - 1)) / points.length);

        points.forEach((point, index) => {
            const barHeight = chartHeight * point.amount / maxValue;
            const x = padding.left + index * (barWidth + barGap);
            const y = padding.top + chartHeight - barHeight;

            ctx.fillStyle = "#4f8cff";
            ctx.fillRect(x, y, barWidth, barHeight);

            ctx.fillStyle = "#1f2937";
            ctx.font = "600 12px Helvetica Neue, Arial, sans-serif";
            ctx.fillText(String(point.amount), x, y - 8);

            ctx.fillStyle = "#6c757d";
            ctx.font = "12px Helvetica Neue, Arial, sans-serif";
            ctx.fillText(point.label, x, padding.top + chartHeight + 24);
        });
    }
};
