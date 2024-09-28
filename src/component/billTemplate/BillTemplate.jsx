import { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { managerContext } from '../../container';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';

const BillTemplate = ({ setShowBillPreview, bill }) => {

  console.log(bill);
  const date = bill.date.split(',');
  const invoiceDate = date[0];
  const invoiceTime = date[1];
  const subTotal = bill.orders.reduce((sum, order) => sum + order.Price, 0);
  const discount = 0;
  const shippingCharge = 0;
  const tax = 8;
  const total = subTotal + discount + shippingCharge + tax;
  const reference = useRef();

  const {sendBill} = useContext(managerContext);

  const handlePrintReceipt = useReactToPrint({
    content: () => reference.current,
  }, (content) =>{
    console.log(content);
  });

  const handleSendBill = async () => {
    const billContent = reference.current;
    const opt = {
      margin: 1,
      filename: 'bill.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    try {
      const billPDF = await html2pdf().from(billContent).set(opt).outputPdf('blob');
      sendBill(bill.phone, billPDF);
    } catch (error) {
      toast.error('Failed to generate the PDF.', { autoClose: 2500 });
    }
  };

  return (
    <div style={{ margin: 0, width: '100%' }}>
      <div ref={reference} style={{ margin: '0 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '10px',
            borderRadius: '5px',
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#6c757d' }}>Hungry Potato</h1>
            <h2 style={{ fontSize: '1.2rem', color: '#28a745', float: 'right' }}>
              Invoice #{bill.BillNo} <span style={{
                color: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                marginLeft: '0.5rem'
              }}>Paid</span>
            </h2>
          </div>
          <div style={{ color: '#6c757d' }}>
            <p style={{ margin: 0 }}>3184 Spruce Drive Pittsburgh, PA 15201</p>
            <p style={{ margin: 0 }}><i className='uil uil-envelope-alt'></i> xyz@987.com</p>
            <p style={{ margin: 0 }}><i className='uil uil-phone'></i> 012-345-6789</p>
          </div>
        </div>
        <hr style={{ margin: '1rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '15px', margin: 0 }}>Billed To:</h2>
            <h2 style={{ fontSize: '15px', margin: 0 }}>{bill.customerName}</h2>
            <p style={{ margin: 0 }}>{bill.phone}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '15px', margin: 0 }}>
              Invoice Date: <span style={{ fontWeight: 500, color: '#6c757d' }}>{invoiceDate}</span>
            </h2>
            <h2 style={{ fontSize: '15px', margin: 0 }}>
              Invoice Time: <span style={{ fontWeight: 500, color: '#6c757d' }}>{invoiceTime}</span>
            </h2>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
          <h3 style={{ fontSize: '14px', margin: 0, marginBottom: '10px' }}>Order Summary</h3>
          <table style={{ width: '100%', margin: 'auto', padding: 0 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'center', padding: '0.35rem', fontSize: '14px' }}>No.</th>
                <th style={{ textAlign: 'center', padding: '0.35rem', fontSize: '14px' }}>Item</th>
                <th style={{ textAlign: 'center', padding: '0.35rem', fontSize: '14px' }}>Quantity</th>
                <th style={{ textAlign: 'center', padding: '0.35rem', fontSize: '14px' }}>Size</th>
                <th style={{ textAlign: 'center', padding: '0.35rem', fontSize: '14px' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {bill.orders.map((order, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'center', padding: '0.35rem' }}>{idx + 1}</td>
                  <td style={{ textAlign: 'center', padding: '0.35rem' }}>
                    <h5 style={{ fontSize: '12px', margin: 0 }}>{order.Item}</h5>
                  </td>
                  <td style={{ textAlign: 'center', padding: '0.35rem' }}>{order.Qty}</td>
                  <td style={{ textAlign: 'center', padding: '0.35rem' }}>{order.Size}</td>
                  <td style={{ textAlign: 'center', padding: '0.35rem' }}>$ {order.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ margin: '0.5rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '15px', margin: 0 }}>Sub Total</h4>
              <p style={{ fontSize: '15px', margin: 0 }}>$ {subTotal}</p>
            </div>
            <div style={{ margin: '0.5rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '15px', margin: 0 }}>Discount</h4>
              <p style={{ fontSize: '15px', margin: 0 }}>$ {discount}</p>
            </div>
            <div style={{ margin: '0.5rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '15px', margin: 0 }}>Shipping Charge</h4>
              <p style={{ fontSize: '15px', margin: 0 }}>$ {shippingCharge}</p>
            </div>
            <div style={{ margin: '0.5rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '15px', margin: 0 }}>GST</h4>
              <p style={{ fontSize: '15px', margin: 0 }}>$ {tax}</p>
            </div>
            <div style={{ margin: '0.5rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '15px', margin: 0 }}>Total</h4>
              <p style={{ fontSize: '15px', margin: 0 }}>$ {total}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 2rem' }}>
        <button
          style={{
            color: 'white',
            fontWeight: 500,
            padding: '1rem',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
          onClick={handlePrintReceipt}
        >
          Print Receipt
        </button>
        <button
          style={{
            color: 'white',
            fontWeight: 500,
            padding: '1rem',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
          onClick={handleSendBill}
        >
          Send on number
        </button>
        <button
          style={{
            color: 'white',
            fontWeight: 500,
            padding: '1rem',
            backgroundColor: '#6c757d',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
          onClick={() => setShowBillPreview(false)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BillTemplate;
