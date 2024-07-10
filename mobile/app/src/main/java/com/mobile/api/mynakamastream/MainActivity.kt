package com.mobile.api.mynakamastream

import android.Manifest
import android.content.pm.PackageManager
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

    private val BASE_URL = "https://www.google.com/"
    private lateinit var webView: WebView

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

    private fun isInternetPermissionGranted(): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.INTERNET
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestInternetPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.INTERNET),
            INTERNET_PERMISSION_REQUEST_CODE
        )
    }

    private fun setupWebView() {
        webView.apply {
            settings.javaScriptEnabled = true
            webViewClient = MyWebViewClient()
            webChromeClient = MyWebChromeClient()
            loadUrl(BASE_URL)
        }
    }

    private class MyWebViewClient : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
            view?.loadUrl(url ?: "")
            return true
        }
    }

    private class MyWebChromeClient : WebChromeClient() {
        // You can override methods like onProgressChanged() here if you want to display progress
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == INTERNET_PERMISSION_REQUEST_CODE && grantResults.isNotEmpty()
            && grantResults[0] == PackageManager.PERMISSION_GRANTED
        ) {
            // Internet permission granted, set up WebView
            setupWebView()
        }
    }

    companion object {
        private const val INTERNET_PERMISSION_REQUEST_CODE = 123
    }
}
