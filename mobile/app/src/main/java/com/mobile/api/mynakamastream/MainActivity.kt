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

/**
 * This activity loads a web page into a WebView after checking and requesting internet permission if necessary.
 */
class MainActivity : AppCompatActivity() {

    // URL of the web page to load
    private val BASE_URL = "http://nakamastream.domcloud.dev/"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Check and request internet permission if not granted
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
            // Internet permission granted, proceed to set up WebView
            setupWebView()
        }
    }

    /**
     * Set up the WebView to display the web page.
     */
    private fun setupWebView() {
        val webView: WebView = findViewById(R.id.WebView)

        // Enable JavaScript
        val settings = webView.settings
        settings.javaScriptEnabled = true

        // Configure WebViewClient to handle navigation within the WebView
        webView.webViewClient = WebViewClient()

        // Configure WebChromeClient to display page loading progress
        webView.webChromeClient = object : WebChromeClient() {
            // You can override methods like onProgressChanged() here if you want to display progress
        }

        // Load the URL into the WebView
        webView.loadUrl(BASE_URL)
    }
}
