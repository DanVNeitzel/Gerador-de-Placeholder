function copyDirectLink() {
          const link = document.getElementById('directLink').textContent;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(() => {
              alert('Link copiado!');
            }).catch(() => {
              alert('Não foi possível copiar o link.');
            });
          } else {
            alert('Clipboard API não suportada neste navegador.');
          }
        }

function getURLSize() {
      const params = new URLSearchParams(window.location.search);
      const size = params.get('size');
      if (size) {
        const match = size.match(/^(\d+)x(\d+)$/);
        if (match) {
          return { w: parseInt(match[1]), h: parseInt(match[2]) };
        }
      }
      return null;
    }

    function generate() {
      let w = parseInt(document.getElementById('width').value) || 100;
      let h = parseInt(document.getElementById('height').value) || 100;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#cccccc';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#000000';
      ctx.font = `${Math.floor(w / 10)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${w}x${h}`, w / 2, h / 2);

      const img = document.getElementById('preview');
      img.src = canvas.toDataURL("image/png");

      const link = document.getElementById('directLink');
      link.textContent = img.src;
    }

    window.onload = () => {
      const size = getURLSize();
      if (size) {
        document.getElementById('width').value = size.w;
        document.getElementById('height').value = size.h;
      }
      generate();
    };
