// JavaScript Completo
document.addEventListener("DOMContentLoaded", function () {
  // Menu Móvel (Hamburguer)
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("header nav")

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active")
      const icon = menuToggle.querySelector("i")
      if (nav.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Fecha o menu móvel ao clicar em um link
  document.querySelectorAll("header nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        menuToggle.querySelector("i").classList.remove("fa-times")
        menuToggle.querySelector("i").classList.add("fa-bars")
      }
    })
  })

  // Destaque do Link Ativo na Navegação com Scroll
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll("header nav ul li a")

  function changeLinkState() {
    let index = sections.length
    while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove("active"))

    if (navLinks[index]) {
      navLinks[index].classList.add("active")
    }
  }

  if (sections.length > 0 && navLinks.length > 0) {
    changeLinkState()
    window.addEventListener("scroll", changeLinkState)
  }

  // --- FUNCIONALIDADE DE BUSCA DE ENDEREÇO POR CEP ---
  const handleCepInput = (cepInput, prefix) => {
    const loader = document.getElementById(`loader_${prefix}`)

    const fillAddressFields = (data) => {
      document.getElementById(`${prefix}_rua`).value = data.logradouro || ""
      document.getElementById(`${prefix}_bairro`).value = data.bairro || ""
      document.getElementById(`${prefix}_cidade`).value = data.localidade || ""
      document.getElementById(`${prefix}_estado`).value = data.uf || ""

      if (data.logradouro) {
        document.getElementById(`${prefix}_numero`).focus()
      }
    }

    const clearAddressFields = () => {
      document.getElementById(`${prefix}_rua`).value = ""
      document.getElementById(`${prefix}_bairro`).value = ""
      document.getElementById(`${prefix}_cidade`).value = ""
      document.getElementById(`${prefix}_estado`).value = ""
    }

    cepInput.addEventListener("blur", async () => {
      const cep = cepInput.value.replace(/\D/g, "")

      if (cep.length !== 8) {
        return
      }

      loader.style.display = "block"

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()

        if (data.erro) {
          alert("CEP não encontrado. Por favor, verifique o número digitado.")
          clearAddressFields()
        } else {
          fillAddressFields(data)
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error)
        alert("Não foi possível buscar o endereço. Tente novamente.")
      } finally {
        loader.style.display = "none"
      }
    })
  }

  const cepOrigemInput = document.getElementById("cep_origem")
  const cepDestinoInput = document.getElementById("cep_destino")

  if (cepOrigemInput) handleCepInput(cepOrigemInput, "origem")
  if (cepDestinoInput) handleCepInput(cepDestinoInput, "destino")

  // Formulário de Orçamento para WhatsApp
  const quoteForm = document.getElementById("quoteForm")
  const whatsAppNumber = "5527992436270"

  if (quoteForm) {
    const allInputs = quoteForm.querySelectorAll(
      "input[required], textarea[required]"
    )
    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
          input.classList.remove("input-error")
        }
      })
    })

    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault()

      const requiredFields = [
        ["nome", "Nome Completo"],
        ["telefone", "Telefone"],
        ["cep_origem", "CEP de Origem"],
        ["origem_rua", "Rua de Origem"],
        ["origem_numero", "Número de Origem"],
        ["origem_bairro", "Bairro de Origem"],
        ["origem_cidade", "Cidade de Origem"],
        ["origem_estado", "Estado de Origem"],
        ["cep_destino", "CEP de Destino"],
        ["destino_rua", "Rua de Destino"],
        ["destino_numero", "Número de Destino"],
        ["destino_bairro", "Bairro de Destino"],
        ["destino_cidade", "Cidade de Destino"],
        ["destino_estado", "Estado de Destino"],
        ["data_mudanca", "Data da Mudança"],
        ["itens_mudanca", "Principais Itens da Mudança"],
      ]
      let errors = []

      requiredFields.forEach(([fieldId]) =>
        document.getElementById(fieldId).classList.remove("input-error")
      )

      requiredFields.forEach(([fieldId, fieldName]) => {
        const field = document.getElementById(fieldId)
        if (field.value.trim() === "") {
          errors.push(fieldName)
          field.classList.add("input-error")
        }
      })

      if (errors.length > 0) {
        alert(
          `Por favor, preencha os seguintes campos obrigatórios:\n\n- ${errors.join(
            "\n- "
          )}`
        )
        document.querySelector(".input-error")?.focus()
        return
      }

      const nome = document.getElementById("nome").value.trim()
      const telefone = document.getElementById("telefone").value.trim()
      const email = document.getElementById("email").value.trim()
      const cepOrigem = document.getElementById("cep_origem").value.trim()
      const origemRua = document.getElementById("origem_rua").value.trim()
      const origemNumero = document.getElementById("origem_numero").value.trim()
      const origemComplemento = document
        .getElementById("origem_complemento")
        .value.trim()
      const origemBairro = document.getElementById("origem_bairro").value.trim()
      const origemCidade = document.getElementById("origem_cidade").value.trim()
      const origemEstado = document.getElementById("origem_estado").value.trim()
      const cepDestino = document.getElementById("cep_destino").value.trim()
      const destinoRua = document.getElementById("destino_rua").value.trim()
      const destinoNumero = document
        .getElementById("destino_numero")
        .value.trim()
      const destinoComplemento = document
        .getElementById("destino_complemento")
        .value.trim()
      const destinoBairro = document
        .getElementById("destino_bairro")
        .value.trim()
      const destinoCidade = document
        .getElementById("destino_cidade")
        .value.trim()
      const destinoEstado = document
        .getElementById("destino_estado")
        .value.trim()
      const dataMudanca = document.getElementById("data_mudanca").value
      const tipoResidenciaOrigem = document.getElementById(
        "tipo_residencia_origem"
      ).value
      const detalhesResidenciaOrigem = document
        .getElementById("detalhes_residencia_origem")
        .value.trim()
      const tipoResidenciaDestino = document.getElementById(
        "tipo_residencia_destino"
      ).value
      const detalhesResidenciaDestino = document
        .getElementById("detalhes_residencia_destino")
        .value.trim()
      const itensMudanca = document.getElementById("itens_mudanca").value.trim()
      const servicosAdicionais = []
      document
        .querySelectorAll('input[name="servicos_adicionais"]:checked')
        .forEach((checkbox) => {
          const label = document.querySelector(`label[for="${checkbox.id}"]`)
          servicosAdicionais.push(
            label ? label.innerText.trim() : checkbox.value
          )
        })
      const observacoes = document.getElementById("observacoes").value.trim()

      let mensagem = `*📝 SOLICITAÇÃO DE ORÇAMENTO - SAMPAIO MUDANÇAS*\n\n`
      mensagem += `👤 *Cliente:*\n`
      mensagem += `  Nome: ${nome}\n`
      mensagem += `  Telefone: ${telefone}\n`
      if (email) mensagem += `  Email: ${email}\n`
      mensagem += `\n🚚 *Origem:*\n`
      mensagem += `  CEP: ${cepOrigem}\n`
      mensagem += `  Endereço: ${origemRua}, ${origemNumero}${
        origemComplemento ? " - " + origemComplemento : ""
      }\n`
      mensagem += `  Bairro: ${origemBairro}\n`
      mensagem += `  Cidade/UF: ${origemCidade}/${origemEstado}\n`
      mensagem += `  Tipo Imóvel: ${tipoResidenciaOrigem}\n`
      if (detalhesResidenciaOrigem)
        mensagem += `  Detalhes Origem: ${detalhesResidenciaOrigem}\n`
      mensagem += `\n🏁 *Destino:*\n`
      mensagem += `  CEP: ${cepDestino}\n`
      mensagem += `  Endereço: ${destinoRua}, ${destinoNumero}${
        destinoComplemento ? " - " + destinoComplemento : ""
      }\n`
      mensagem += `  Bairro: ${destinoBairro}\n`
      mensagem += `  Cidade/UF: ${destinoCidade}/${destinoEstado}\n`
      mensagem += `  Tipo Imóvel: ${tipoResidenciaDestino}\n`
      if (detalhesResidenciaDestino)
        mensagem += `  Detalhes Destino: ${detalhesResidenciaDestino}\n`
      mensagem += `\n🗓️ *Data da Mudança:*\n  ${new Date(
        dataMudanca + "T00:00:00"
      ).toLocaleDateString("pt-BR")}\n`
      mensagem += `\n📦 *Principais Itens:*\n${itensMudanca}\n`
      if (servicosAdicionais.length > 0) {
        mensagem += `\n🛠️ *Serviços Adicionais:*\n  ${servicosAdicionais.join(
          ", "
        )}\n`
      }
      if (observacoes) {
        mensagem += `\n📄 *Observações:*\n  ${observacoes}\n`
      }
      mensagem += `\n\n_Mensagem enviada automaticamente pelo site._`
      const mensagemCodificada = encodeURIComponent(mensagem)
      const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${mensagemCodificada}`
      window.open(whatsappUrl, "_blank")
    })
  }

  // Animação de seções ao rolar
  const animatedSections = document.querySelectorAll("section")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 }
  )

  animatedSections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    observer.observe(section)
  })

  // ===============================================
  // ===== FUNCIONALIDADE DA GALERIA (LIGHTBOX) ====
  // ===============================================

  const galleryItems = document.querySelectorAll(".gallery-item img")
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const closeBtn = document.getElementById("close-lightbox")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  if (galleryItems.length > 0 && lightbox) {
    const images = Array.from(galleryItems).map((item) => item.src)
    let currentIndex = 0

    function showImage(index) {
      lightboxImg.src = images[index]
      currentIndex = index
      lightbox.style.display = "flex"
    }

    function hideLightbox() {
      lightbox.style.display = "none"
    }

    function showNextImage() {
      const nextIndex = (currentIndex + 1) % images.length
      showImage(nextIndex)
    }

    function showPrevImage() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      showImage(prevIndex)
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => showImage(index))
    })

    closeBtn.addEventListener("click", hideLightbox)
    nextBtn.addEventListener("click", showNextImage)
    prevBtn.addEventListener("click", showPrevImage)

    // Fechar o lightbox ao clicar fora da imagem
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        hideLightbox()
      }
    })

    // Navegação com as teclas do teclado
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") {
          showNextImage()
        } else if (e.key === "ArrowLeft") {
          showPrevImage()
        } else if (e.key === "Escape") {
          hideLightbox()
        }
      }
    })
  }
})
