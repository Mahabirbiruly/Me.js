class MoonbixBot {
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  run() {
    setInterval(async () => {
      const buttonPlayGame = this.findButtonPlayGame();
      if (!buttonPlayGame) {
        return; // Exit if the button is not found
      }

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      buttonPlayGame.dispatchEvent(event);

      await this.sleep(1000);

      for (let i = 0; i < 50; i++) {
        await this.sleep(1000);
        this.simulateLeftClick();
      }

      this.findReturnButtonElementsAndClick();
      await this.sleep(1500);
    }, 1000); // Runs every second
  }

  findButtonPlayGame() {
    const button = document.querySelector("[class^='Game_entry__playBtn']");
    if (button) {
      const style = window.getComputedStyle(button);
      if (style.marginTop === "40px") {
        return button; // Return the button if conditions are met
      }
    }
    return null; // Return null if the button is not found
  }

  findReturnButtonElementsAndClick() {
    const svgs = document.getElementsByTagName("svg");
    for (let svg of svgs) {
      if (
        svg.outerHTML ===
        '<svg class="bn-svg absolute top-4 start-4 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path></svg>'
      ) {
        const event = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        svg.dispatchEvent(event); // Click the SVG if matched
      }
    }
  }

  simulateLeftClick() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const mouseDownEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 0, // Left mouse button
      });
      const mouseUpEvent = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 0, // Left mouse button
      });
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 0, // Left mouse button
      });

      canvas.dispatchEvent(mouseDownEvent);
      canvas.dispatchEvent(mouseUpEvent);
      canvas.dispatchEvent(clickEvent);
    }
  }
}

const moonBixBot = new MoonbixBot();
moonBixBot.run(); // Start the bot
