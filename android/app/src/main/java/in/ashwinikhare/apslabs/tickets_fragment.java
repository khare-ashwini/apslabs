package in.ashwinikhare.apslabs;

import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.EditText;

import java.io.DataOutputStream;
import java.io.IOException;
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
        return view;
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
        byte[] postData       = urlParameters.getBytes( StandardCharsets.UTF_8 );
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
