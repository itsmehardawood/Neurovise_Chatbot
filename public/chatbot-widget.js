(function () {
    const businessId = document.currentScript.getAttribute('data-business-id');
  
    if (!businessId) return;
  
    const iframe = document.createElement('iframe');
    iframe.src = `http://localhost:3000/widget?business_id=${businessId}`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '400px';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.zIndex = '9999';
    iframe.allow = 'clipboard-write';
  
    document.body.appendChild(iframe);
  })();
  