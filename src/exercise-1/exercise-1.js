export function statement(invoice, vehicles) {
  const statementData = createStatementData(invoice, vehicles);
  return renderTxtStatement(statementData);
}

export function renderStatementToHtml(invoice, vehicles) {
  const statementData = createStatementData(invoice, vehicles);

  return renderHtml(statementData);
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>vehicle</th><th>minutes</th><th>cost</th></tr>\n';
  for (let ride of data.rides) {
    result += `<tr><td>${ride.vehicle.name}</td><td>${ride.minutes}</td>`;
    result += `<td>${formatAsPln(ride.amount)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${formatAsPln(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.volumeCredits}</em> credits</p>\n`;
  return result;
}

function renderTxtStatement(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let ride of data.rides) {
    // print line for this ride
    result += ` ${ride.vehicle.name}: ${formatAsPln(ride.amount)} (${ride.minutes} minutes)\n`;
  }
  result += `Amount owed is ${formatAsPln(data.totalAmount)}\n`;
  result += `You earned ${data.volumeCredits} credits\n`;
  return result;

}

function formatAsPln(number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
  }).format(number / 100);
}

function createStatementData(invoice, vehicles) {
  const result = {};
  result.customer = invoice.customer;
  result.rides = invoice.rides.map(extendRides);
  result.totalAmount = totalAmount(result);
  result.volumeCredits = totalVolumeCredits(result);
  return result;

  function extendRides(ride) {
    const result = Object.assign({}, ride);
    result.vehicle = vehicleFor(ride);
    result.amount = amountFor(result);
    return result;
  }

  function totalVolumeCredits(data) {
    let result = 0;
    for (let ride of data.rides) {
      result += volumeCreditsFor(ride);
    }
    return result;
  }

  function volumeCreditsFor(ride) {
    let result = 0;
    result += Math.max(ride.minutes - 30, 0);
    // add extra credit for every ten eco minutes
    if ('eco' === ride.vehicle.type)
      result += Math.floor(ride.minutes / 5);
    return result;
  }

  function totalAmount(data) {
    let result = 0;
    for (let ride of data.rides) {
      result += ride.amount;
    }
    return result;
  }

  //To w tym miejscu moge sprawdzic, czy nie przyszlo cos pustego
  function vehicleFor(ride) {
    return vehicles[ride.vehicleId];
  }

  function amountFor(ride) {
    let result = 0;
    switch (ride.vehicle.type) {
      case 'eco':
        result = 500;
        if (ride.minutes > 30) {
          result += 20 * (ride.minutes - 30);
        }
        break;
      case 'electric':
        result = 1000;
        if (ride.minutes > 10) {
          result += 500 + 150 * (ride.minutes - 10);
        }
        result += 50 * ride.minutes;
        break;
      default:
        throw new Error(`unknown type: ${ride.vehicle.type}`);
    }
    return result;
  }
}






