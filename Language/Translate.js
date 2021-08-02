import i18n from 'i18n-js'

i18n.translations = {
  "fr-FR" : {
    acceuilTitre : "Exposition Micro-Ordinateur NAM-IP",
    acceuilBoutonFrise : "Ligne du temps",
    acceuilBoutonVideo : "Videos",
    acceuilBoutonQRCode : "Lire QRCode",
    friseTexte :  "Ligne du Temps",
    listeVideoTexte : "Liste de Vidéos",
    permissionCamera : "Autorisation d'utiliser la caméra",
    refusCamera : "Refus de la Caméra",
    erreurScan : "Aucun ID reconnu",
    scanAgain : "Rescanner"
  },
  "en" : {
    acceuilTitre : "NAM-IP MicroComputer Exposure",
    acceuilBoutonFrise : "Timeline",
    acceuilBoutonVideo : "Videos",
    acceuilBoutonQRCode : "QRCode Scan",
    friseTexte : "Timeline",
    listeVideoTexte : "Video List",
    permissionCamera : "Requesting for camera permission",
    refusCamera : "No access to camera",
    erreurScan : "No ID match",
    scanAgain : "Scan Again"
  }
}

i18n.locale = "fr-FR"
i18n.fallback = true

export default i18n
