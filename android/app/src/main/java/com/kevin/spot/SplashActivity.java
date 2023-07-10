package com.kevin.spot; // ← Make sure that is your package name

import android.content.Intent;
import android.os.Bundle;
// import android.view.View;
import androidx.appcompat.app.AppCompatActivity;

// import android.support.v7.app.AppCompatActivity; 

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // View decorView = getWindow().getDecorView();
        // decorView.setSystemUiVisibility(
        //         View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        //                 | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        //                 | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}