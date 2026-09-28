// Browser-only product exploration. No API requests or outbound messages.
(() => {
  const tabs=[...document.querySelectorAll('.lptab')];
  function syncTabs(){tabs.forEach(tab=>{const selected=tab.classList.contains('active');tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});}
  tabs.forEach((tab,i)=>{
    const id=tab.dataset.lp;tab.id='portal-tab-'+id;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','lpp-'+id);
    const panel=document.getElementById('lpp-'+id);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);
    tab.addEventListener('click',syncTabs);
    tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].click();tabs[next].focus();}});
  });syncTabs();
  document.querySelectorAll('.lprow').forEach(row=>{row.tabIndex=0;row.setAttribute('role','button');row.setAttribute('aria-label','Open demo conversation with '+row.querySelector('.lprn').textContent);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();row.click();}});});
  const run=document.getElementById('portal-run');const nodes=[...document.querySelectorAll('.portal-node')];let step=-1;
  const descriptions=['A catalogue enquiry starts the flow.','The customer receives a collection message.','The flow waits for the customer’s reply.','An interest tag adds context to the contact.','The sales team is notified to continue the conversation.'];
  run.addEventListener('click',()=>{step=(step+1)%nodes.length;nodes.forEach((n,i)=>n.classList.toggle('current',i===step));document.getElementById('portal-flow-status').textContent=`Step ${step+1} of ${nodes.length}: ${descriptions[step]}`;run.textContent=step===nodes.length-1?'Restart walkthrough ↺':'Next step →';});
})();
