package com.mobile.api.mynakamastream

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {

    // URL de la página web que quieres cargar
    private val BASE_URL = "https://www.google.com/"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Verificar y solicitar permiso de Internet si es necesario
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.INTERNET
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.INTERNET),
                    123
                )
            }
        } else {
            setupWebView()
        }
    }

    private fun setupWebView() {
        val webView: WebView = findViewById(R.id.WebView)

        // Habilitar JavaScript
        val settings = webView.settings
        settings.javaScriptEnabled = true

        // Configurar WebViewClient para manejar la navegación dentro del WebView
        webView.webViewClient = WebViewClient()

        // Configurar WebChromeClient para mostrar el progreso de la carga de la página
        webView.webChromeClient = object : WebChromeClient() {
            // Aquí puedes sobrescribir métodos como onProgressChanged() si quieres mostrar el progreso
        }

        // Cargar la URL en el WebView
        webView.loadUrl(BASE_URL)
    }
}
