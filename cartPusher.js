const cartPusher = () => {
  
  /* GET DATA */
  let numImages = document.querySelectorAll('.mini-cart-image').length;

  const getCartImageSources = () => {
    let cartImageUrls = [];
    for (let i = 0; i < numImages && i < 3; i++) {
      cartImageUrls.push(document.querySelectorAll('.mini-cart-image > a > img')[i].attributes.src.value);
    }
    return cartImageUrls;
  }

  const cartImageSources = getCartImageSources();
  const numCartItems = document.querySelector('.minicart-quantity').innerHTML;
  let cartTotal = '$0';
    if (Number(numCartItems)) { cartTotal = document.querySelector('.order-value').innerHTML; }

  const targetScrollPosition = document.body.scrollHeight - window.innerHeight - (document.body.scrollHeight/10);

  const numItemsDisplayed = Number(numCartItems) > 3 && numImages > 3 
                            ? `3 of ${numCartItems} Items` 
                              : Number(numCartItems) > 1 
                                ? `${numCartItems} Items` 
                                : '1 Item';

  let disabled = false;
  let background = null;

  /* CREATE ELEMENTS */
  const buildOverlay = () => {

    background = document.createElement('div');
      const overlay = document.createElement('div');
        const h1 = document.createElement('H1');
        h1.innerHTML = 'Your Cart';
        const h3 = document.createElement('H3');
        h3.innerHTML = numItemsDisplayed;
        const h4 = document.createElement('H4');
        h4.innerHTML = `total: ${cartTotal}`;
        const cartImages = document.createElement('div');
        const buttons = document.createElement('div');
          const dismissButton = document.createElement('button');
          dismissButton.innerHTML = 'DISMISS';
          const continueButtonWrapper = document.createElement('a');
          continueButtonWrapper.href = 'https://www.marmot.com/cart';
            const continueButton = document.createElement('button');
            continueButton.innerHTML = 'CONTINUE TO YOUR CART';
            
    background.appendChild(overlay);
      overlay.appendChild(h1);
      overlay.appendChild(h3);
      overlay.appendChild(cartImages);
      overlay.appendChild(h4);
      overlay.appendChild(buttons);
        buttons.appendChild(dismissButton);
        buttons.appendChild(continueButtonWrapper);
        continueButtonWrapper.appendChild(continueButton);

    background.style.cssText = 'display: none; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,.5); z-index: 50;';
    overlay.style.cssText = 'position: fixed; top: 0; bottom: 0; left: 0; right: 0; height: 325px; width: 70%; max-width: 650px; min-width: 350px; margin: auto; background-color: white; box-shadow: 3px 3px 15px -2px rgba(0,0,0,0.6); z-index: 100;';
    h1.style.cssText = 'margin: auto; text-align: center; padding: 4%; background-color: #f0f0f0; font: 24px/1 ars_maquette_prolight,sans-serif; font-size: 32px; font-weight: 200;';
    h3.style.cssText = 'text-align: center; width: 80%; margin: 5px auto; padding: 5px; border-bottom: 1px solid #bcbcbc; font: 12px/1 ars_maquette_prolight,sans-serif; font-weight: 200;';
    cartImages.style.cssText = 'padding: 7px 15px; text-align: center;';
    h4.style.cssText = 'text-align: center; padding-top: 5px; font: 10px/1 ars_maquette_prolight,sans-serif; font-weight: 200;';
    buttons.style.cssText = 'margin-top: 10px; text-align: center;';
    
    const normalButtonStyle = 'text-decoration: none; padding: 10px 25px; margin: 0 2px; color: black; font-family: ars_maquette_probold,sans-serif; font-size: 10px; font-weight: 600; border: 2px solid #000;';

    [dismissButton, continueButton].forEach(btn => {
        btn.style.cssText = normalButtonStyle;
        btn.addEventListener('mouseenter', (evt) => {
          evt.target.style.cssText = 'text-decoration: none; padding: 10px 25px; margin: 0 2px; color: black; font-family: ars_maquette_probold,sans-serif; font-size: 10px; font-weight: 600; border: 2px solid red; background-color: red; color: white;'
        });
        btn.addEventListener('mouseleave', (evt) => {
          evt.target.style.cssText = normalButtonStyle;
        });
    });

    dismissButton.addEventListener('click', (evt) => {
      setTimeout(()=> { disabled = false }, 300000); // 5mins after dismissing the first time
      background.style.display = 'none';
    });

    cartImageSources.forEach(imgSrc => {
      let currentImg = document.createElement('img');
      currentImg.src = imgSrc;
      currentImg.style.cssText = 'padding: 0 3px;';
      cartImages.appendChild(currentImg);
    })

    document.body.appendChild(background);
  }
  buildOverlay();

  /* TRIGGER */
  const displayOverlay = () => {
    disabled = true;
    background.style.display = 'block';
  }

  window.addEventListener('scroll', evt => {
    if (!disabled && Number(numCartItems)) {
      let currentScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScrollPosition >= targetScrollPosition) {
        displayOverlay();
      }
    }
  });

}
cartPusher();
