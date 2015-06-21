package in.ashwinikhare.apslabs;

import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;

import com.parse.ParseObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by ash on 6/20/15.
 */

public class tickets_fragment extends DialogFragment {

    private EditText mEditText;

    public tickets_fragment() {
        // Empty constructor required for DialogFragment
    }

    public static tickets_fragment newInstance(String title) {
        tickets_fragment frag = new tickets_fragment();
        Bundle args = new Bundle();
        args.putString("title", title);
        frag.setArguments(args);
        return frag;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tickets_dialog, container);
        mEditText = (EditText) view.findViewById(R.id.txtName);
        String title = getArguments().getString("title", "Enter Name");
        getDialog().setTitle(title);
        // Show soft keyboard automatically
        mEditText.requestFocus();

        getDialog().getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);

        Button button = (Button) view.findViewById(R.id.btnSubmit);
        final EditText nameEditText = (EditText) view.findViewById(R.id.txtName);
        final EditText emailEditText = (EditText) view.findViewById(R.id.txtEmail);
        final EditText qtyEditText = (EditText) view.findViewById(R.id.txtQty);

        button.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                //Get Form parameters

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
                Thread thread = new Thread(new Runnable(){
                    @Override
                    public void run() {

                        try {
                            //Your code goes here

                            String name = nameEditText.getText().toString();
                            String email = emailEditText.getText().toString();
                            String qty = qtyEditText.getText().toString();

                            ParseObject testObject = new ParseObject("TestObject");
                            testObject.put("name", name);
                            testObject.put("email", email);
                            testObject.put("qty", qty);
                            testObject.saveInBackground();

                            String urlParameters  = "name="+name+"&quantity="+qty+"&seat=0&cost=10";
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
                                try( DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
                                    wr.write(postData);
                                }
                                try {

                                    System.out.println("****** Content of the URL ********");
                                    BufferedReader br =
                                            new BufferedReader(
                                                    new InputStreamReader(conn.getInputStream()));

                                    String input;

                                    while ((input = br.readLine()) != null){
                                        Log.v("Test", input);
                                    }
                                    br.close();

                                } catch (IOException e) {
                                    e.printStackTrace();
                                }


                            } catch (IOException e){
                                throw new RuntimeException(e);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });

                thread.start();

            }
        });
        return view;
    }


}
