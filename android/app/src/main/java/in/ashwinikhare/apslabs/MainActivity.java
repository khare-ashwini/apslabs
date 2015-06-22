package in.ashwinikhare.apslabs;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.parse.Parse;
import com.parse.ParseInstallation;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import javax.net.ssl.HttpsURLConnection;


public class MainActivity extends FragmentActivity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Set a ToolBar to replace the ActionBar.
       // Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
       // setSupportActionBar(toolbar);
        // Setup Parse
        // Enable Local Datastore.
        Parse.enableLocalDatastore(this);
        final String ParseKey = "";
        final String ParsePwd = "";
        Parse.initialize(this, ParseKey, ParsePwd);
        ParseInstallation.getCurrentInstallation().saveInBackground();
        /*
        ParseObject testObject = new ParseObject("TestObject");
        testObject.put("foo", "bar");
        testObject.saveInBackground();
        */

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void twitter_action(View view){

        EditText hashTag_field = (EditText)findViewById(R.id.hashtag_name);
        String hashTag_value = hashTag_field.getText().toString();

        String url = "http://www.twitter.com/intent/tweet?hashtags=" + hashTag_value;
        Intent i = new Intent(Intent.ACTION_VIEW);
        i.setData(Uri.parse(url));
        startActivity(i);

        Context context = getApplicationContext();
        CharSequence text = "Twitter Link";
        int duration = Toast.LENGTH_SHORT;

        Toast toast;
        toast = Toast.makeText(context, url, duration);
        toast.show();
    }

    public void instagram_action(View view){
        Context context = getApplicationContext();
        CharSequence text = "Instagram Action";
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();
    }
    public void lovecam_action(View view){
        Context context = getApplicationContext();
        CharSequence text = "Lovecam Action";
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();

        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        intent.putExtra("android.intent.extras.CAMERA_FACING", 1);
        startActivity(intent);
       // intent.putExtra(MediaStore.EXTRA_OUTPUT,
       //         Uri.fromFile(destination));
    }

    /*
    public final String APP_TAG = "MyCustomApp";
    public final static int CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE = 1034;
    public String photoFileName = "photo.jpg";

    public void onLaunchCamera(View view) {
        // create Intent to take a picture and return control to the calling application
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, getPhotoFileUri(photoFileName)); // set the image file name
        // Start the image capture intent to take photo
        startActivityForResult(intent, CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE) {
            if (resultCode == RESULT_OK) {
                Uri takenPhotoUri = getPhotoFileUri(photoFileName);
                // by this point we have the camera photo on disk
                Bitmap takenImage = BitmapFactory.decodeFile(takenPhotoUri.getPath());
                // Load the taken image into a preview
                ImageView ivPreview = (ImageView) findViewById(R.id.ivPreview);
                ivPreview.setImageBitmap(takenImage);
            } else { // Result was a failure
                Toast.makeText(this, "Picture wasn't taken!", Toast.LENGTH_SHORT).show();
            }
        }
    }

    // Returns the Uri for a photo stored on disk given the fileName
    public Uri getPhotoFileUri(String fileName) {
        // Get safe storage directory for photos
        File mediaStorageDir = new File(
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), APP_TAG);

        // Create the storage directory if it does not exist
        if (!mediaStorageDir.exists() && !mediaStorageDir.mkdirs()){
            Log.d(APP_TAG, "failed to create directory");
        }

        // Return the file target for the photo based on filename
        return Uri.fromFile(new File(mediaStorageDir.getPath() + File.separator + fileName));
    }
    */

    public void tickets_action(View view){
        Context context = getApplicationContext();
        CharSequence text = "Tickets Action";
        int duration = Toast.LENGTH_SHORT;
        Toast toast = Toast.makeText(context, text, duration);
        toast.show();

        FragmentManager fm = getSupportFragmentManager();
        tickets_fragment editNameDialog = tickets_fragment.newInstance("Book A Ticket");
        editNameDialog.show(fm, "fragment_edit_name");
    }

    public void bookSeat(View view){
        //Get Form parameters
        EditText nameEditText = (EditText) view.findViewById(R.id.txtName);
        EditText emailEditText = (EditText) view.findViewById(R.id.txtEmail);
        EditText qtyEditText = (EditText) view.findViewById(R.id.txtQty);

        String name = nameEditText.getText().toString();
        String email = emailEditText.getText().toString();
        String qty = qtyEditText.getText().toString();

        /*
        AsyncHttpClient client = new AsyncHttpClient();
        RequestParams params = new RequestParams();
        params.put("key", "value");
        params.put("more", "data");

       new TextHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, String res) {
                // called when response HTTP status is "200 OK"
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, String res, Throwable t) {
                // called when response HTTP status is "4XX" (eg. 401, 403, 404)
            }
        }

        */

        String urlParameters  = "name="+name+"&email="+email+"&qty="+qty;
        byte[] postData       = urlParameters.getBytes(StandardCharsets.UTF_8);
        int    postDataLength = postData.length;
        String request        = "https://mighty-plateau-5584.herokuapp.com/tickets/feed";

        try {
            URL url = new URL(request);
            HttpsURLConnection conn= (HttpsURLConnection) url.openConnection();
            conn.setDoOutput( true );
            conn.setInstanceFollowRedirects( false );
            conn.setRequestMethod( "POST" );
            conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty( "charset", "utf-8");
            conn.setRequestProperty( "Content-Length", Integer.toString( postDataLength ));
            conn.setUseCaches( false );
            try( DataOutputStream wr = new DataOutputStream( conn.getOutputStream())) {
                wr.write(postData);
            }
        } catch (IOException e){
            throw new RuntimeException(e);
        }

    }

}


