package com.mobile.api.mynakamastream

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

/**
 * MainActivity loads a web page into a WebView after checking and requesting internet permission if necessary.
 */
class MainActivity : AppCompatActivity() {

    // URL of the web page to load
    private val BASE_URL = "https://www.google.com/"
    private var webView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize WebView
        webView = findViewById(R.id.webView)

        // Check and request internet permission if not granted
        if (!isInternetPermissionGranted()) {
            requestInternetPermission()
        } else {
            // Internet permission granted, proceed to set up WebView
            setupWebView()
        }
    }

    /**
     * Check if internet permission is granted.
     */
    private fun isInternetPermissionGranted(): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.INTERNET
        ) == PackageManager.PERMISSION_GRANTED
    }

    /**
     * Request internet permission.
     */
    private fun requestInternetPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.INTERNET),
            INTERNET_PERMISSION_REQUEST_CODE
        )
    }

    /**
     * Set up the WebView to display the web page.
     */
    private fun setupWebView() {
        val webView: WebView = findViewById(R.id.webView)

        // Configure web settings
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true

        // Configure WebViewClient to handle navigation within the WebView
        webView.webViewClient = MyWebViewClient()

        // Configure WebChromeClient to display page loading progress
        webView.webChromeClient = MyWebChromeClient()

        // Load the URL into the WebView
        webView.loadUrl(BASE_URL)
    }

    /**
     * Custom WebViewClient to handle navigation within the WebView.
     */
    private class MyWebViewClient : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
            view?.loadUrl(url)
            return true
        }
    }

    /**
     * Custom WebChromeClient to display page loading progress.
     */
    private class MyWebChromeClient : WebChromeClient() {
        // You can override methods like onProgressChanged() here if you want to display progress
    }

    /**
     * Handle permission request result.
     */
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == INTERNET_PERMISSION_REQUEST_CODE && grantResults.isNotEmpty()
            && grantResults[0] == PackageManager.PERMISSION_GRANTED
        ) {
            // Internet permission granted, reload the web page
            webView?.reload()
        }
    }

    companion object {
        private const val INTERNET_PERMISSION_REQUEST_CODE = 123
    }
}
